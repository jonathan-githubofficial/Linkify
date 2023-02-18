import React from 'react'
import { BiPencil } from 'react-icons/bi'
import localEducation from '../../static/local_education'

export default function Education() {
  return (
    <div className='p-5'>
        <div className="grid grid-col-2 mb-2 flex">
            <div class="grid grid-cols-2 gap-2 items-start">
                <div>
                    <h1 className='text-xl font-semibold mb-5'>Education</h1>
                </div>
                <div className="flex">
                    <div style={{marginLeft: "auto"}}>
                        <label htmlFor="my-modal-5" className="">
                            <BiPencil className='cursor-pointer text-xl'/>
                        </label>
                    </div>
                </div>

            </div>
        </div>
        {localEducation.map(education => (
            <div>
                <div className="flex justify-left mt-2">
                    <div className="flex items-start">
                        <div className='avatar'>
                            <div className="w-12">
                                <img src={education.school_logo} className='eduLogo' />
                            </div>
                        </div>
                        <div className="flex flex-col pl-5">
                            <p className="text-lg lg:text-xl">{education.school_name}</p>
                            <span className="text-sm">{education.degree}</span>
                            <span className='text-xs mt-1'>{education.startDate} - {education.endDate}</span>

                            <div className='mt-2'>
                                <p className='text-s'>
                                    - {education.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='mt-5' />
            </div>
        ))}
    </div>
  )
}
