import React, { useState, useEffect, useCallback } from 'react';

import { getCourseDetails, incitementLike } from '../firebase/courseDetailsPage.js';
import Loader from '../components/Loader/Loader.js';
import ShowMsg from '../components/ShowMsg/ShowMsg.js';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import IosShareIcon from '@mui/icons-material/IosShare';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';

import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/courseDetailsPage.css';

function CourseDetailsPage() {
	const [courseId, setCourseId] = useState('');
	const [courseDetail, setCourseDetail] = useState({});
	const [msg, setMsg] = useState({ text: '', type: '' });
	const [isGetCourseApiLoading, setIsGetCourseApiLoading] = useState(true);
	const [shareBtnTooltip, setShareBtnTooltip] = useState('Click to Copy');

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
		const courseId = window.location.pathname.split('/').pop();
		if (courseId === 'course' || courseId === '') return (window.location = '/all_courses');
		setCourseId(courseId);
		getCourseDetails(courseId, setCourseDetail, setIsGetCourseApiLoading, handleMsgShown);
	}, [handleMsgShown]);

	const handleAddToCartBtnClick = useCallback(() => {
		const enrolled_courses = JSON.parse(localStorage.getItem('enrolled_courses')) || [];

		let courseIdExists = enrolled_courses.some((course) => course.courseId === courseId);

		if (!courseIdExists) {
			enrolled_courses.push(courseDetail);
			localStorage.setItem('enrolled_courses', JSON.stringify(enrolled_courses));
			handleMsgShown('Course Added to Cart', 'success');
		} else {
			handleMsgShown('Course Already in Cart', 'warning');
		}
	}, [courseId, handleMsgShown, courseDetail]);

	const handleShareBtnClick = useCallback(() => {
		navigator.clipboard.writeText(window.location?.href);
		handleMsgShown('Shearing Link Copied', 'success');
		setShareBtnTooltip('Link Copied');
		setTimeout(() => {
			setShareBtnTooltip('Click to Copy');
		}, 2500);
	}, [handleMsgShown]);

	return (
		<div className="courseDetailsPage">
			<Toolbar />
			<Loader isLoading={isGetCourseApiLoading} />
			{!isGetCourseApiLoading && (
				<div className="courseDetailsBox">
					<div className="courseDetailsBoxLeft">
						<img src={courseDetail?.thumbnail || photoNotAvailable} className="courseDetailImage" alt="" />
					</div>
					<div className="courseDetailsBoxRight">
						<div className="courseTypeShare">
							<div className="courseInstructor">By {courseDetail?.instructor}</div>
							<Tooltip
								title={<span style={{ fontSize: '17px', padding: '5px' }}>{shareBtnTooltip}</span>}
								style={{ fontSize: 20 }}
								arrow
								placement="top"
							>
								<IconButton aria-label="delete" onClick={handleShareBtnClick}>
									<IosShareIcon />
								</IconButton>
							</Tooltip>
						</div>

						<div className="openCourseTitle">
							{courseDetail?.name}
							<div style={{ display: 'flex', alignItems: 'center', fontSize: '21px' }}>
								<IconButton
									color="secondary"
									sx={{ color: 'red', mr: 1 }}
									onClick={() => incitementLike(courseId)}
								>
									<FavoriteIcon />
								</IconButton>
								<span>{courseDetail?.likes}</span>
							</div>
						</div>
						<div className="openCourseDesc">{courseDetail?.description}</div>
						<div className="openCourseDuration">
							<b>Duration:</b> {courseDetail?.duration}
						</div>
						<div className="openCourseSchedule">
							<b>Schedule:</b> {courseDetail?.schedule}
						</div>
						<div className="openCourseLocation">
							<b>Location:</b> {courseDetail?.location}
						</div>

						<details className="openCourseSyllabus">
							<summary>
								<b>Syllabus:</b>
							</summary>
							<ul>
								{courseDetail?.syllabus?.map((syllabus, index) => (
									<li key={index} style={{ marginBottom: '10px' }}>
										Week {syllabus.week}: {syllabus.topic} - {syllabus.content}
									</li>
								))}
							</ul>
						</details>

						<Button
							variant="contained"
							color="secondary"
							className="openCourseBtn"
							sx={{ mt: 3, mr: 2, py: 1.2, px: 2.5 }}
							startIcon={<FlashOnRoundedIcon />}
							onClick={handleAddToCartBtnClick}
						>
							{courseDetail?.enrollmentStatus === 'Open'
								? 'Enroll Now'
								: courseDetail?.enrollmentStatus === 'Closed'
								? 'Closed'
								: 'Enrolled'}
						</Button>
					</div>
				</div>
			)}

			{msg && <ShowMsg isError={msg?.text ? true : false} msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default CourseDetailsPage;
