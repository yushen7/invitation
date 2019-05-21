const isPro = Object.is(process.env.NODE_ENV, 'production')

export default {
  baseUrl: isPro ? 'https://xingkong.gqt.gcu.edu.cn/invitation/api' : '/api',
  prefixUrl: isPro ? '' : ''
}