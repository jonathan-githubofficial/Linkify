import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function JobsView(props) {
    // Common attributes
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    // Jobs attributes
    const [job_company, setJobCompany] = useState('');
    const [job_salary, setJobSalary] = useState('');

    // Events attributes
    const [event_date, setEventDate] = useState('');

    //
    var type_host = '';
    var type_price_date = '';
    var type_redirect_url = '';
    var type_submit_button = '';

    if(props.type == 'jobs' && props.job != undefined) {
        useEffect (() => {
            var job = props.job;
            setId(job._id);
            setTitle(job.title);
            setJobCompany(job.company);
            setJobSalary(job.salary);
            setLocation(job.location);
            setDescription(job.description);
        })
    }
    else if(props.type == 'events') {
        useEffect (() => {
            var event = props.event;
            setId(event._id);
            setTitle(event.name);
            setLocation(event.location);
            setDescription(event.description);
            setEventDate(event.date);
        })
    }
    else if(props.type == 'groups') {
        useEffect (() => {
            var group = props.group;
            setId(group._id);
            setTitle(group.name);
            setDescription(group.description);
        })
    }

    if(props.type == 'jobs') {
        type_host = job_company;
        type_price_date = job_salary;
        type_redirect_url = '/';
        type_submit_button = 'Apply';
    }
    else if(props.type == 'events') {
        type_host = location;
        type_price_date = event_date.split("T")[0];
        type_redirect_url = '/event/' + id;
        type_submit_button = 'View More';
    }
    else if(props.type == 'groups') {
        type_redirect_url = '/group/' + id;
        type_submit_button = 'View More';
    }

    return (
        <div className="flex flex-col items-start flex-1 gap-5 lg:flex-row">
            <div className="w-20">
                <img className={"rounded-lg"} src={props.profile_pic} alt="Logo"/>
            </div>

            <div className="flex-1 items-initial lg:text-start">
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <div>
                    {props.type != 'groups' &&
                    <>
                        <span className="text-green-500">{type_host}</span>
                        <span className='pl-2 pr-2'>•</span>
                        <span className='jobs-salary'>{type_price_date}</span>
                    </>
                    }
                    
                    <span className={"jobs-location " + ((props.type == 'events') ? 'hidden' : '')}>{location}</span>

                    <div className='jobs-description pt-5'>
                        {description.substring(0, 50)} ...
                    </div>
                </div>
                <div className='pt-5 text-right'>
                    <Link to={type_redirect_url}>
                        <a className="px-6 py-2 text-white font-semibold duration-150 transform border border-white rounded-full hover:bg-blue-800 bg-indigo-400 group-hover:border-transparent">
                            {type_submit_button}
                        </a>
                    </Link>
                </div>
                
            </div>
        </div>
    );
}

export default JobsView;
