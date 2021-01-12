import { useEffect, useState } from "react";
import {redirectToAuthPageIfNotConnected} from "../../service/local-auth";
import { getAllJobs } from "../../service/job"
import JobCard from "../../component/JobCard";

const Job = (props) => {
    useEffect(() => redirectToAuthPageIfNotConnected(), [])

    // const jobs = props.jobs
    // console.log(jobs)

    const [jobs, setjobs] = useState([])

    useEffect(() => {
        getAllJobs().then((res) => {
            let job = res.data
            console.log(job)
            setjobs(job)
        })
    })

    return (
        <div className="flex flex-wrap w-full">
            {jobs.map(element => { return(<JobCard element={element}/>)})}
        </div>
    );
};

export default Jobs;