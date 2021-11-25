// 从URL中获取指定的参数
export function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}