import Cookies from 'js-cookie';

const useInteractCookie = (id) => {
    const hasLiked = Cookies.get(`like_${id}`) === 'true';
    const hasDisLiked = Cookies.get(`dislike_${id}`) === 'true';

    const setLikeCookie = () => {
        Cookies.set(`like_${id}`, 'true', { path: '/' });
        // Reset dislike cookie when setting like
        Cookies.remove(`dislike_${id}`, { path: '/' });
    };

    const setDislikeCookie = () => {
        Cookies.set(`dislike_${id}`, 'true', { path: '/' });
        // Reset like cookie when setting dislike
        Cookies.remove(`like_${id}`, { path: '/' });
    };

    return { hasLiked, hasDisLiked, setLikeCookie, setDislikeCookie };
};

export default useInteractCookie;
