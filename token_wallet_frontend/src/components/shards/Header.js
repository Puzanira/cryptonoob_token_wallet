import React from "react";

const Header = ({ title, description }) => (
    <div className="panel-block">
        <div className="content">
            <h1 className="title is-size-15 is-uppercase">{title}</h1>
            <h2 className="subtitle is-size-6 has-text-grey-light">
                {description}
            </h2>
        </div>
    </div>
);

export default Header;