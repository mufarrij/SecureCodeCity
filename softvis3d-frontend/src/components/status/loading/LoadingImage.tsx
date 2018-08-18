import * as React from "react";
import MDSpinner from "react-md-spinner";

export default class LoadingImage extends React.Component<{}, any> {
    public render() {
        return (
            <div>
                <span className="cssload-label">LOADING</span>
                <div>
                    <MDSpinner />
                </div>
            </div>
         );
    }
}
