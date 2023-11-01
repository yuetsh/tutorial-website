const BASE_URL = "https://judge0api.hyyz.izhai.net"

function encode(str: string) {
  return btoa(unescape(encodeURIComponent(str || "")))
}

export function decode(bytes?: string) {
  const latin = atob(bytes ?? "")
  return new TextDecoder("utf-8").decode(
    Uint8Array.from({ length: latin.length }, (_, index) =>
      latin.charCodeAt(index),
    ),
  )
}

export async function createSubmission(
  code: string,
  stdin: string,
  id: number,
) {
  const encodedCode = encode(code)
  let compilerOptions = ""
  if (id === 50) compilerOptions = "-lm" // 解决 GCC 的链接问题
  const payload = {
    source_code: encodedCode,
    language_id: id,
    stdin: encode(stdin),
    redirect_stderr_to_stdout: true,
    compiler_options: compilerOptions,
  }
  try {
    const response = await fetch(
      `${BASE_URL}/submissions?base64_encoded=true&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    )
    const data = await response.json()
    return {
      status: { id: data.status.id },
      output: [decode(data.compile_output), decode(data.stdout)]
        .join("\n")
        .trim(),
    }
  } catch (e) {
    console.error(e)
  }
}
