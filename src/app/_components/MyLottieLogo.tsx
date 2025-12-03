
"use client";

import animationData from "../assets/calendar.json";
import { useLottie } from "lottie-react";

export const MyLottieComponent = () => {
    const defaultOptions = {
        animationData: animationData,
        loop: true,
    };

    const { View } = useLottie(defaultOptions);

    return (
        <>
            <div>
                <div>{View}</div>
            </div>
        </>
    )
}
