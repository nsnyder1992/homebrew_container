import Image from "next/image";

export function useMDXComponents(components) {
  return {
    img: (props) => {
      const alt = props?.alt || "";
      let width = 100;
      let height = 100;
      let sizes = "100vw";
      const styleObj = {};
      if (alt.includes("'")) {
        const arr = alt.split("'");
        const style = arr[1].trim(); // Get styles
        const styleArr = style.split(";");
        styleArr.forEach((s) => {
          const [key, value] = s.split("=");
          styleObj[key.trim()] = value.trim();
        });
        if (styleObj.sizes) {
          sizes = styleObj.sizes;
        }
        if (styleObj.width) {
          width = styleObj.width;
        }
        if (styleObj.height) {
          height = styleObj.height;
        }
      } else {
        props.alt = alt;
      }

      return (
        <Image
          {...props}
          style={styleObj}
          sizes={sizes}
          width={width}
          height={height}
          alt={props?.alt}
        />
      );
    },
    ...components,
  };
}
