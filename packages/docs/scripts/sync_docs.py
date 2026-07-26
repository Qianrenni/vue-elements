"""Synchronize package README API documents and generate the docs navigation manifest."""

import json
import shutil
from dataclasses import dataclass
from pathlib import Path

DOCS_ROOT = Path(__file__).resolve().parent.parent
PACKAGES_ROOT = DOCS_ROOT.parent
PUBLIC_DOCS_ROOT = DOCS_ROOT / 'public' / 'docs'
MANIFEST_PATH = DOCS_ROOT / 'src' / 'utils' / 'useComponentInfo.ts'
DISPLAY_ROOT = DOCS_ROOT / 'src' / 'display'


@dataclass(frozen=True)
class DocsEntry:
    """A documentation page rendered by the documentation application."""

    name: str
    display_name: str
    category: tuple[str, ...]
    doc_path: str
    package_name: str
    demo_path: str | None = None


def copy_readme(source: Path, target: Path) -> None:
    """Copy one source README to its generated documentation destination.

    Args:
        source: Canonical README file stored next to source code.
        target: Generated Markdown path under the docs public directory.

    Returns:
        None.

    Raises:
        OSError: If the source cannot be read or the target cannot be written.
    """
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)


def get_component_readme(component_file: Path, components_root: Path) -> Path | None:
    """Find the nearest README for a Vue component without leaving its source root.

    Args:
        component_file: Vue source file that needs API documentation.
        components_root: Root directory containing all Vue component sources.

    Returns:
        The nearest README path, or None when the component has no README.

    Raises:
        OSError: If filesystem metadata cannot be read.
    """
    current = component_file.parent
    while current.is_relative_to(components_root):
        candidate = current / 'README.md'
        if candidate.is_file():
            return candidate
        if current == components_root:
            break
        current = current.parent
    return None


def get_demo_path(doc_relative_path: Path) -> str | None:
    """Return the display module path when a matching demo file exists.

    Args:
        doc_relative_path: Documentation path relative to public/docs without suffix.

    Returns:
        A slash-delimited display module path without extension, or None.

    Raises:
        OSError: If the display file cannot be inspected.
    """
    demo_file = DISPLAY_ROOT / doc_relative_path.with_suffix('.vue')
    if demo_file.is_file():
        return doc_relative_path.as_posix()
    return None


def sync_vue_components() -> list[DocsEntry]:
    """Synchronize Vue component READMEs and produce their navigation entries.

    Returns:
        Sorted entries for documented Vue components.

    Raises:
        OSError: If component source files or generated docs cannot be accessed.
    """
    source_root = PACKAGES_ROOT / 'components' / 'src' / 'components'
    entries: list[DocsEntry] = []
    for source in sorted(source_root.rglob('*.vue')):
        readme = get_component_readme(source, source_root)
        if readme is None:
            continue
        relative = source.relative_to(source_root)
        if source.stem == source.parent.name:
            relative = relative.parent.parent / source.name
        docs_relative = Path('components') / relative.with_suffix('.md')
        copy_readme(readme, PUBLIC_DOCS_ROOT / docs_relative)
        doc_without_suffix = docs_relative.with_suffix('')
        entries.append(
            DocsEntry(
                name=source.stem,
                display_name=source.stem,
                category=('Vue Components', *relative.parent.parts),
                doc_path=f'/docs/{docs_relative.as_posix()}',
                package_name='qyani-components',
                demo_path=get_demo_path(doc_without_suffix),
            ),
        )
    return entries


def sync_readme_directory(
    source_root: Path,
    destination_root: Path,
    category_prefix: tuple[str, ...],
    package_name: str,
) -> list[DocsEntry]:
    """Synchronize one directory tree whose API README belongs to its folder.

    Args:
        source_root: Source directory containing README files.
        destination_root: Documentation directory relative to public/docs.
        category_prefix: Labels prepended to navigation categories.
        package_name: Public package name shown in the detail page.

    Returns:
        Sorted navigation entries for the synchronized README files.

    Raises:
        OSError: If README files cannot be copied to the generated docs directory.
    """
    entries: list[DocsEntry] = []
    for readme in sorted(source_root.rglob('README.md')):
        relative_dir = readme.parent.relative_to(source_root)
        if not relative_dir.parts:
            continue
        docs_relative = destination_root / relative_dir.with_suffix('.md')
        copy_readme(readme, PUBLIC_DOCS_ROOT / docs_relative)
        doc_without_suffix = docs_relative.with_suffix('')
        entries.append(
            DocsEntry(
                name=relative_dir.name,
                display_name=relative_dir.name,
                category=(*category_prefix, *relative_dir.parent.parts),
                doc_path=f'/docs/{docs_relative.as_posix()}',
                package_name=package_name,
                demo_path=None,
            ),
        )
    return entries


def clear_generated_api_docs() -> None:
    """Remove only API document trees managed by this synchronization script.

    Returns:
        None.

    Raises:
        OSError: If a managed generated directory cannot be removed.
    """
    for name in ('components', 'events', 'utils', 'core'):
        shutil.rmtree(PUBLIC_DOCS_ROOT / name, ignore_errors=True)


def write_manifest(entries: list[DocsEntry]) -> None:
    """Write a deterministic TypeScript manifest consumed by the docs UI.

    Args:
        entries: Complete generated documentation entry collection.

    Returns:
        None.

    Raises:
        OSError: If the generated TypeScript manifest cannot be written.
    """
    payload = [
        {
            'name': entry.name,
            'displayName': entry.display_name,
            'category': list(entry.category),
            'docPath': entry.doc_path,
            'packageName': entry.package_name,
            'demoPath': entry.demo_path,
        }
        for entry in sorted(entries, key=lambda item: (item.category, item.name))
    ]
    content = """export interface DocsEntry {
  category: string[];
  demoPath?: string;
  displayName: string;
  docPath: string;
  name: string;
  packageName: string;
}

export const docsEntries: DocsEntry[] = """
    MANIFEST_PATH.write_text(
        content + json.dumps(payload, ensure_ascii=False, indent=2) + ' as DocsEntry[];\n',
        encoding='utf-8',
    )


def main() -> None:
    """Synchronize API docs from package READMEs and regenerate navigation metadata.

    Returns:
        None.

    Raises:
        OSError: If source READMEs, generated docs, or the manifest cannot be accessed.
    """
    clear_generated_api_docs()
    entries = sync_vue_components()
    entries.extend(
        sync_readme_directory(
            PACKAGES_ROOT / 'components' / 'src' / 'events',
            Path('events'),
            ('Browser Utilities', 'Events'),
            'qyani-components',
        ),
    )
    entries.extend(
        sync_readme_directory(
            PACKAGES_ROOT / 'components' / 'src' / 'utils',
            Path('utils'),
            ('Browser Utilities', 'Utilities'),
            'qyani-components',
        ),
    )
    entries.extend(
        sync_readme_directory(
            PACKAGES_ROOT / 'core' / 'src',
            Path('core'),
            ('Core',),
            '@qyani/core',
        ),
    )
    write_manifest(entries)
    print(f'Synchronized {len(entries)} documentation pages.')


if __name__ == '__main__':
    main()
