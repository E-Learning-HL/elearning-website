import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "@/src/style/detail.css";
import iconLocation from "@/public/icon/icon-location.svg";
import Image from "next/image";

function Location({ address }) {
  // const iframeMap = [
  //   <iframe
  //     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14898.262770223671!2d105.78825021738281!3d21.010039599999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad36abb97bbf%3A0x1e14101cf9a6cdff!2sNha%20Khoa%20Oze%20Tr%E1%BA%A7n%20Duy%20H%C6%B0ng!5e0!3m2!1svi!2s!4v1707963632481!5m2!1svi!2s"
  //     width="100%"
  //     height="450"
  //     style={{ border: "none", borderRadius: "16px" }}
  //     allowfullscreen=""
  //     loading="lazy"
  //     referrerpolicy="no-referrer-when-downgrade"
  //   ></iframe>,
  //   <iframe
  //     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14900.233920104707!2d105.82869308715817!3d20.990292799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad01ec66a1c7%3A0xcf227eafd39b387b!2zUGjDsm5nIEtow6FtIE5oYSBLaG9hIEjhuqNpIMSQxINuZw!5e0!3m2!1svi!2s!4v1707963904956!5m2!1svi!2s"
  //     width="100%"
  //     height="450"
  //     allowfullscreen=""
  //     loading="lazy"
  //     referrerpolicy="no-referrer-when-downgrade"
  //   ></iframe>,
  //   <iframe
  //     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14900.233920104707!2d105.82869308715817!3d20.990292799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5e5fc3ebd5%3A0xdca0f5c950c1d023!2sNha%20khoa%20Trang%20Dung!5e0!3m2!1svi!2s!4v1707963920154!5m2!1svi!2s"
  //     width="100%"
  //     height="450"
  //     allowfullscreen=""
  //     loading="lazy"
  //     referrerpolicy="no-referrer-when-downgrade"
  //   ></iframe>,
  //   <iframe
  //     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14897.402405730456!2d105.84050038715822!3d21.018653100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab1719bb305b%3A0xc5382420927e5dec!2zTmhhIEtob2EgR2lhIMSQw6xuaCBDxqEgU-G7nyA0!5e0!3m2!1svi!2s!4v1707963932129!5m2!1svi!2s"
  //     width="100%"
  //     height="450"
  //     allowfullscreen=""
  //     loading="lazy"
  //     referrerpolicy="no-referrer-when-downgrade"
  //   ></iframe>,
  //   <iframe
  //     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14897.402405730456!2d105.84050038715822!3d21.018653100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8a61a6b9e9%3A0x1852dbc05b054a80!2zTmhhIEtob2EgMzAgVlQgxJDhuqFpIEPhu5MgVmnhu4d0!5e0!3m2!1svi!2s!4v1707963944253!5m2!1svi!2s"
  //     width="100%"
  //     height="450"
  //     allowfullscreen=""
  //     loading="lazy"
  //     referrerpolicy="no-referrer-when-downgrade"
  //   ></iframe>,
  // ];
  // let ramdomMap = iframeMap[Math.floor(Math.random() * iframeMap.length)];
  // const position = {
  //   lat: address?.length > 0 ? parseFloat(address[0].latitude) : null,
  //   lng: address?.length > 0 ? parseFloat(address[0].longitude) : null,
  // };

  return (
    <div className="wp-location">
      <div className="wp-address">
        <Image src={iconLocation}></Image>
        <p className="addressTitle">Địa chỉ:</p>
        <p className="addressDetails">
          {address?.length > 0 ? address[0].detail_address : "_"}
        </p>
      </div>
      {/* {address?.length > 0 && address[0].latitude && address[0].longitude && (
        <div className="wp-map">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_API_GOOGLE_KEY}>
            <Map center={position} zoom={15}>
              <Marker position={position} />
            </Map>
          </APIProvider>
        </div>
      )} */}

      {address[0].google_map_embed && (
        <div
          className="wp-map"
          dangerouslySetInnerHTML={{ __html: address[0]?.google_map_embed }}
        ></div>
      )}
    </div>
  );
}

export default Location;
