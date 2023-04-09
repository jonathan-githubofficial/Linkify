// Profile cover component
// Author: Khalid Sadat
// Date created: March 3, 2023
// Description: Project cover component for showing the the profile cover

import React, { useEffect, useState } from "react";

export default function UserIm(props) {
    var name = props.name;

    const UserImg = ["avatar"];
    const currentUser = name + "";
    const currentUserWords = currentUser.split(" ");

    const matchingTexts = UserImg.filter(user => {
        const userWords = user.split(" ");
        const matchingWords = currentUserWords.filter(word => userWords.includes(word));
        return matchingWords.length >= 2;
    });

    return (
        <div className="w-auto UserImg text-md pl-1">
            {matchingTexts.length > 0 && (
                'avatar'
            )}
        </div>
    );
}
