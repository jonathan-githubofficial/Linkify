import React from 'react'
import { BiPencil } from 'react-icons/bi'
import localExperiences from '../../static/local_experience'

export default function Experience() {
  return (
    <div className='p-5'>
        <div className="grid grid-col-2 mb-2 flex">
            <div class="grid grid-cols-2 gap-2 items-start">
                <div>
                    <h1 className='text-xl font-semibold mb-5'>Experience</h1>
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

        {localExperiences.map(experience => (
            <div>
                <div className="flex justify-left mt-2">
                    <div className="flex items-start">
                        <div className='avatar'>
                            <div className="w-12">
                                <img src={experience.company_logo} />
                            </div>
                        </div>
                        <div className="flex flex-col pl-5">
                            <p className="text-lg lg:text-xl">{experience.position}</p>
                            <span className="text-sm">{experience.company}</span>
                            <span className='text-xs mt-1'>{experience.startDate} - {experience.endDate}</span>
                            <span className='text-xs mt-1'>
                                United States
                            </span>
                            <div className='mt-2'>
                                <p className='text-s'>
                                    - Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                </p>
                                <p>
                                    - Voluptatibus quia, nulla! Maiores et perferendis eaque.
                                </p>
                                <p>
                                    - Exercitationem praesentium nihil.
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
