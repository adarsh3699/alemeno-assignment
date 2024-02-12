import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllcourses } from '../firebase/allCoursePage.js';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';

import Toolbar from '@mui/material/Toolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/allCoursePage.css';

function AllCoursePage() {
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(true);
	const [allCourses, setAllCourses] = useState([]);
	const navigate = useNavigate();

	const handleMsgShown = useCallback((msgText, type) => {
		if (msgText) {
			setMsg({ text: msgText, type: type });
			setTimeout(() => {
				setMsg({ text: '', type: '' });
			}, 2500);
		} else {
			console.log('Please Provide Text Msg');
		}
	}, []);

	useEffect(() => {
		getAllcourses(setAllCourses, setIsGetCourseApiLoading, handleMsgShown);
	}, [handleMsgShown]);

	const handleCourseClick = useCallback(
		(courseId) => {
			console.log(courseId);
			navigate(`/course/${courseId}`);
		},
		[navigate]
	);

	return (
		<div className="coursePage">
			<div className="homePageContainer" component="main">
				<Toolbar />
				<Loader isLoading={isGetCourseApiLoading} />
				{allCourses.map((item, index) => {
					return (
						<div className="courseBox" onClick={() => handleCourseClick(item.courseId)} key={index}>
							<img
								className="courseImg"
								src={item?.thumbnail || photoNotAvailable}
								loading="lazy"
								alt=""
							/>
							<div className="courseDetails">
								<div className="courseTitle">
									<span>{item?.name}</span>
									<div className="courseLike">
										<FavoriteIcon sx={{ color: 'red' }} />
										<span>{item?.likes}</span>
									</div>
								</div>
								<div className="instructorName">By {item?.instructor}</div>
								<div className="aboutCourse">{item?.description}</div>
							</div>
						</div>
					);
				})}
			</div>
			{msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default AllCoursePage;
