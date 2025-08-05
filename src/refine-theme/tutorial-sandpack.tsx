import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

type TutorialSandpackProps = {
    files: any;
    [key: string]: any;
};

export const TutorialSandpack: React.FC<TutorialSandpackProps> = (props) => {
    return <Sandpack {...props} />;
};
