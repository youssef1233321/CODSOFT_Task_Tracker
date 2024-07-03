import { Container } from "react-bootstrap"

import style from "./style.module.css"

const {h1 , headContainer , opacityContainer} = style

const Header = () => {
  
  return (
    <>
         <Container fluid className={headContainer}>
            <div className={opacityContainer}></div>
            <h1 className={h1}>Task Tracker Application</h1>
         </Container>
    </>
   
   
  )
}

export default Header