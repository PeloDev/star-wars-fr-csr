import { StyleProps } from "@chakra-ui/react";
import starsBG from '../assets/images/stars.png';

export const h1 : StyleProps = {
    fontSize: '2em',
    my: '0.67em',
    mx: 0,
    fontWeight: 700
}

export const h2 : StyleProps = {
    fontSize: '1.5em',
    my: '0.83em',
    mx: 0,
    fontWeight: 700
}

export const starWarsScrollBG : StyleProps = {
    backgroundColor: 'background',
    backgroundImage: starsBG,
    fontFamily: 'Roboto',
    minH: "100vh"
    // overflow: 'auto',
    // overflowY: 'hidden'
}

export const starWarsScrollWrapper : StyleProps = {
    display: 'flex',
    height: '100%',
    width: '60%',
    margin: '0 auto'
}

export const starWarsScrollText : StyleProps = {
    fontSize: '3vw',
    fontWeight: 700,
    lineHeight: '3em',
    textAlign: 'justify',
    position: 'relative',
    mx: [0, -150, -300]
}