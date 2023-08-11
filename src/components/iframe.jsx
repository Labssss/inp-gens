import { useState, useContext, useEffect} from "react";

export function Iframe(props) {
        return (
            <iframe src={props.iframeUrl} frameBorder="0" id="iframe" className='hidden'></iframe>
        );
}
