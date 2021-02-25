import 'antd/dist/antd.css'
//页面css
import '../styles/pages/comm.css'
import '../styles/pages/index.css'
import '../styles/pages/detail.css'
//组件css
import '../styles/components/header.css'
import '../styles/components/author.css'
import '../styles/components/footer.css'
import '../styles/components/special.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
