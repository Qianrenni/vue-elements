import os


def read_file(file_path, mode='r', encoding='utf-8'):
    """
    读取文件内容，支持字符和字节两种方式。

    :param file_path: 文件路径
    :param mode: 读取模式，默认为 'r'（字符模式），可选 'rb'（字节模式）
    :param encoding: 编码格式，默认为 'utf-8'，仅在字符模式下有效
    :return: 文件内容
    """
    if mode == 'rb':
        with open(file_path, mode) as f:
            return f.read()
    else:
        with open(file_path, mode, encoding=encoding) as f:
            return f.read()


def write_file(file_path, content, mode='w', encoding='utf-8'):
    """
    写入文件内容，支持字符和字节两种方式。

    :param file_path: 文件路径
    :param content: 文件内容
    :param mode: 写入模式，默认为 'w'（字符模式），可选 'wb'（字节模式）
    :param encoding: 编码格式，默认为 'utf-8'，仅在字符模式下有效
    """
    if mode == 'wb':
        with open(file_path, mode) as f:
            f.write(content)
    else:
        with open(file_path, mode, encoding=encoding) as f:
            f.write(content)


def get_system_prompt(file_path='system_prompt.txt'):
    return read_file(file_path)


def get_example_md(file_path='F:/eclipse/worakjava/qyani-components/.example.md'):
    return read_file(file_path)


def rpc(system_prompt=get_system_prompt(), message='请你自我介绍'):
    import dashscope
    import os
    messages = [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': message}
    ]
    response = dashscope.Generation.call(
        # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
        api_key=os.getenv('DASHSCOPE_API_KEY'),
        model="qwen-flash",
        # 此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
        messages=messages,
        result_format='message'
    )
    if response.status_code == 200:
        return ''.join(map(lambda choice: choice.message.content, response.output.choices))
    else:
        raise Exception(f"Error: {response.status_code}, {response.message}")


src_path = r'F:/eclipse/worakjava/qyani-components/src'


def main():
    system_prompt = get_system_prompt()
    example_md = get_example_md()
    for root, dirs, files in os.walk(src_path):
        for file in files:
            if file.endswith('.vue') or file.endswith('.ts'):
                file_path = os.path.join(root, file).replace('\\', '/')
                out_path = file_path.replace('src', 'docs').replace('.vue', '.md').replace('.ts', '.md')
                print(f'正在处理文件：{file_path} 输出文件：{out_path}')
                if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
                    pass
                else:
                    if not os.path.exists(out_path):
                        write_file(out_path, '')
                content = read_file(file_path)
                message = f'阅读下面这个vue文件或者ts文件内容${content},并按照我给你的md模板${example_md}生成对应的文档,Expose的方法必须是有defineExpose定义的否则没有,' \
                          f'如果你觉得这个模板与当前的文件内容不太匹配你可以自我发挥,如果文件内容是类似于index.ts这种导入导出的那么你可以返回一个# 暂无内容,全部的返回内容不要有任何的附加语言,直接是一个md内容,' \
                          f'不要有你自己的解释'
                result = rpc(system_prompt, message)
                write_file(out_path, result)
                print(f'处理完成：{file_path}')


if __name__ == '__main__':
    main()
