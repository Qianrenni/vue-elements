from pathlib import Path
import shutil

IGNORE_FILE_PARTS = {'Sql', 'types', 'style', 'scripts', 'index', 'DemoBlock', 'main', 'composable'}
IGNORE_FILE_STEMS = {'type', 'composable', 'index', 'style'}
IGNORE_DIR_NAMES = {'types', 'style', 'scripts', 'index', 'DemoBlock'}
VALID_EXTENSIONS = {'.vue', '.ts'}


def should_ignore_dir(name: str) -> bool:
    """Check if a directory should be skipped entirely."""
    return any(field in name for field in IGNORE_DIR_NAMES)


def should_ignore_file(rel_path: str) -> bool:
    """Check if a file should be skipped (index.ts, composable.ts, type.ts, style.ts, etc.)."""
    stem = Path(rel_path).stem
    if stem in IGNORE_FILE_STEMS:
        return True
    return any(field in rel_path for field in IGNORE_FILE_PARTS)


def flatten_vue_path(rel_path: str) -> str:
    """Flatten component subdirectories.

    When a .vue file sits in a directory with the same name (e.g. Icon/Icon.vue),
    the redundant directory level is removed:
      components/basic/Icon/Icon.vue -> components/basic/Icon.vue

    When the parent directory name differs from the file name (e.g. animations/Breathing.vue),
    the path is kept as-is:
      components/loading/animations/Breathing.vue -> components/loading/animations/Breathing.vue
    """
    parts = rel_path.replace('\\', '/').split('/')
    if len(parts) >= 2:
        parent_dir = parts[-2]
        stem = Path(parts[-1]).stem
        if parent_dir == stem:
            return '/'.join(parts[:-2] + [parts[-1]])
    return rel_path


def main():
    src_path = Path(__file__).parent.parent.parent / 'components' / 'src'
    target_display_path = Path(__file__).parent.parent / 'src' / 'display'
    target_docs_path = Path(__file__).parent.parent / 'public' / 'docs'

    # Delete existing directories
    shutil.rmtree(target_display_path, ignore_errors=True)
    shutil.rmtree(target_docs_path, ignore_errors=True)

    def _helper(dir_path: Path):
        for sub_path in sorted(dir_path.iterdir()):
            if sub_path.is_dir():
                if not should_ignore_dir(sub_path.name):
                    _helper(sub_path)
            else:
                rel_path = str(sub_path.relative_to(src_path)).replace('\\', '/')

                # Skip files matching ignore keywords
                if should_ignore_file(rel_path):
                    continue

                # Only process .vue and .ts files
                if sub_path.suffix not in VALID_EXTENSIONS:
                    continue

                # Determine flattened path
                if sub_path.suffix == '.vue':
                    flat_rel = flatten_vue_path(rel_path)
                else:
                    # .ts files (events, utils) keep their path structure
                    flat_rel = rel_path

                # Create .md stub in public/docs/
                md_rel = flat_rel.replace('.vue', '.md').replace('.ts', '.md')
                md_file = target_docs_path / md_rel
                md_file.parent.mkdir(parents=True, exist_ok=True)
                md_file.touch(exist_ok=True)

                # Create .vue stub in src/display/
                vue_rel = flat_rel.replace('.ts', '.vue')
                vue_file = target_display_path / vue_rel
                vue_file.parent.mkdir(parents=True, exist_ok=True)
                vue_file.touch(exist_ok=True)

                print(f'Created: display/{vue_rel}')

    _helper(src_path)


if __name__ == '__main__':
    main()
