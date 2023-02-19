import React from 'react'
import { BiPencil } from 'react-icons/bi'

export default function EditProfile() {

    return (
        <div>
            <input type="checkbox" id="edit-profile-modal" className="modal-toggle" />
            <div className="modal items-start pt-10">
                <div className="modal-box w-11/12 max-w-5xl editProfileModal">
                    <label htmlFor="edit-profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-xl font-semibold mb-5'>Edit Profile</h1>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                </div>
            </div>
        </div>
    )
}
