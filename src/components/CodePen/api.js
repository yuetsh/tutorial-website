import { submissionBase64 } from './templates'

const BASE_URL = "https://judge0api.hyyz.izhai.net"

function encode(str) {
    return btoa(unescape(encodeURIComponent(str || "")))
}

function decode(bytes) {
    let escaped = escape(atob(bytes || ""))
    try {
        return decodeURIComponent(escaped)
    } catch (e) {
        return unescape(escaped)
    }
}

export async function createSubmission(code, stdin, id) {
    const encodedCode = encode(code)
    id = parseInt(id)
    // 避免模板代码的网络请求
    if (encodedCode === submissionBase64[id].sourceBase64) {
        return submissionBase64[id].result
    } else {
        const payload = {
            source_code: encodedCode,
            language_id: id,
            stdin: encode(stdin),
            redirect_stderr_to_stdout: true
        }
        try {
            const response = await fetch(`${BASE_URL}/submissions?base64_encoded=true&wait=true`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json()
            const memory = (data.memory === null ? "-" : parseInt(data.memory / 1024) + "MB")
            const time = (data.time === null ? "-" : data.time * 1000 + "ms")
            console.log("Token 是", data.token)
            return {
                status: { id: data.status.id, msg: `${data.status.description}, ${time}, ${memory}` },
                output: [decode(data.compile_output), decode(data.stdout)].join("\n").trim(),
            }
        } catch (e) {
            console.error(e)
        }
    }
}
