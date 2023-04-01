//Messages
//Author: Daria Koroleva
//Created: March 27,2023
//Description: Display attachment
import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import axios from 'axios';

function Attachment(props) {

    const { attachments } = props;

     

    async function downloadFile(fileUrl, fileName) {

        try {
            
            const response = await axios.get(fileUrl, {
                responseType: 'blob',
            });

            // Create a blob URL for the file
            const fileBlobUrl = URL.createObjectURL(response.data);

            // Create an anchor element and trigger a download
            const link = document.createElement('a');
            link.href = fileBlobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();

            // Clean up the DOM after download
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }


    return (
        <div>
            {attachments.length !== 0 && (

                <div className="flex items-center mt-2">                    
                    <FaFileAlt />
                    <button
                        onClick={() => downloadFile(`${attachments[0].filePath}`, attachments[0].fileName)}
                        className="download-link"
                    >
                        {attachments[0].fileName}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Attachment
