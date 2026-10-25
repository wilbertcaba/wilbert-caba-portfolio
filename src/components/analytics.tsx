"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export function AnalyticsWithOptOut() {
    const [gaEnabled, setGaEnabled] = useState(false);

    useEffect(() => {
        setGaEnabled(!localStorage.getItem("va-disable"));
    }, []);

    return (
        <>
            <Analytics
                beforeSend={(event) => {
                    // Use localStorage.setItem("va-disable", "true"); to disable analytics on every browser
                    if (localStorage.getItem("va-disable")) return null;
                    return event;
                }}
            />
            {gaEnabled && gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        </>
    );
}
