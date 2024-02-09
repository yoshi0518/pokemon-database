const aspidaConfig = {
  input: 'src/libs/bffApi', // 手動作成する型ファイル保存先
  baseURL: process.env.NEXT_PUBLIC_BFF_API_URL || 'http://localhost:3000', // BaseURL
};

module.exports = aspidaConfig;
