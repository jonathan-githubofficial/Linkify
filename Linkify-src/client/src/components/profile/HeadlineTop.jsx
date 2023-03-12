import React from 'react'
import { BiPencil } from 'react-icons/bi'
import google_icon from '../../static/images/companies/google.png'

import EditProfile from './modal/EditProfile'

export default function HeadlineTop(props) {
    var profile_pic = props.profile_pic;
    var profile = props.profile;
    var company = props.company;

    return (
        <div className='p-5'>
            <div className="grid grid-col-2 mb-2 flex">
                <div class="grid grid-cols-2 gap-2 items-start">
                    <div>
                        <div className='flex items-center'>
                             
                                {/* <img src={google_icon} className='w-6' alt="" />
                                <label className='text-md pl-2 font-semibold'>{company}</label> */}
                            {
                                (company != '' ? <img src={google_icon} className='w-6' alt="" /> : '')
                            }
                            {
                                (company != '' ? <label className='text-md pl-2 font-semibold'>{company}</label>: '')
                            }
                        </div>
                        <div>
                            <p className='primaryGray text-[0.8rem] mt-2' datat-testid='user-location'>
                                Laval, Quebec, Canada
                            </p>
                        </div>
                        <div className='mt-5'>
                            <button className="primaryBtn btn btn-sm bg-sky-400 font-light">Connect</button>
                        </div>
                    </div>
                    
                    <div>
                        <div className="flex">
                            <div style={{marginLeft: "auto"}}>
                                <label htmlFor="edit-profile-modal" className="">
                                    <BiPencil className='cursor-pointer text-xl'/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <EditProfile profile={profile} profile_pic={profile_pic} getUser={props.getUser}/>
                    
                </div>
            </div>
        </div>
    )
}
