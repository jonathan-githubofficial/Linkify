import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import SkillsModal from './modal/Skills'

export default function Skills(props) {
    let id = props.id;
    // var user_skills = props.skills;
    const [user_skills, setSkills] = useState([]);

    useEffect(async () => {
        setSkills(await props.skills);
    });
    

    return (
        <div className='p-5'>
            <div className="grid grid-col-2 mb-2 flex">
                <div class="grid grid-cols-2 gap-2 items-start">
                    <div>
                        <h1 className='text-xl font-semibold mb-5'>Skills</h1>
                    </div>
                    <div className="flex">
                        <div style={{marginLeft: "auto"}}>
                            <label htmlFor="skills-modal" className="">
                                <BiPencil className='cursor-pointer text-xl'/>
                            </label>
                        </div>
                    </div>
                </div>
                <SkillsModal id={id} skills={user_skills} getUser={props.getUser}/>
                <div>
                    {user_skills && Object.keys(user_skills).map((skills_txt) => (
                        <p>&bull; {user_skills[skills_txt]}</p>
                    ))}
                    {/* {typeof(user_skills)} */}
                </div>
            </div>
        </div>
    )
}
