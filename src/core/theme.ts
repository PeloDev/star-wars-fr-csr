import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    background: 'rgb(20, 20, 20)',
    swYello: '#ffc909'
  },
  components: {
    Text: {
      baseStyle: {
        color: "#ffc909",
        fontWeight: 500,
        fontFamily: "Roboto",
        my: '1em'
      }
    }
  }
});

export default theme;
