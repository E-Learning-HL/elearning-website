import { useEffect } from "react";

const Comment = (props) => {
  let dataHref = `${process.env.NEXT_PUBLIC_DEPLOY_URL}/blog/${props.dataHref}`;

  useEffect(() => {
    initFacebookSDK();
  }, []);
  return (
    <>
      <div
        className="fb-comments"
        data-href={dataHref}
        data-width="100%"
        data-numposts="2"
        data-mobile="true"
        data-order-by="reverse_time"
      ></div>
    </>
  );
};

export default Comment;

function initFacebookSDK() {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      version: "v3.0",
    });

    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/vi_VN/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}
