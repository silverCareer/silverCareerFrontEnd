module.exports = function override(config, env) {
    config.resolve.fallback = {
        ...config.resolve.fallback, // 이렇게 하면 기존 설정을 유지하면서 새로운 설정을 추가할 수 있습니다.
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/")
    };
    return config;
}