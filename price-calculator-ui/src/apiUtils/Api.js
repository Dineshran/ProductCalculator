import axios from "axios";
import {APP_URL} from "./UrlConstant";

export const fetchData = async () => {
   const res = await axios(
        `${APP_URL}locations`,
    );
};


