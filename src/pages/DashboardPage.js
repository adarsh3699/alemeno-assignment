import React, { useState, useCallback } from 'react';

import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

import profliePhoto from '../images/proflie.png';
import photoNotAvailable from '../images/photoNotAvailable.jpeg';

import '../styles/dashboardPage.css';
import { Button } from '@mui/material';

let local_enrolled_courses = JSON.parse(localStorage.getItem('enrolled_courses')) || [];

function DashboardPage() {
	const [enrolled_courses, setEnrolled_courses] = useState(local_enrolled_courses);

	const handleCourseClick = useCallback((courseId) => {
		console.log(courseId);
		window.open(`/course/${courseId}`, '_blank');
	}, []);

	const handleMarkAsCompletedBtn = useCallback(
		(courseId) => {
			const temp = enrolled_courses.map((item) => {
				if (item.courseId === courseId) {
					item.enrollmentStatus = 'Closed';
				}
				return item;
			});
			localStorage.setItem('enrolled_courses', JSON.stringify(temp));
			setEnrolled_courses(temp);
		},
		[enrolled_courses]
	);
	return (
		<div className="dashboardPage">
			<Toolbar />

			<section name="studentInfoSection">
				<div className="homePageCoursesTitle">
					Student Dashboard<div className="titleBorder"></div>
				</div>
				<div className="studentInfo">
					<img src={profliePhoto} alt="profliePhoto" className="profliePhoto" />
					<div>
						<div>
							<span className="studentInfoTitle">Student Name: </span>Adarsh Suman
						</div>
						<div>
							<span className="studentInfoTitle">Student Email: </span>adarsh3699@gmail.com
						</div>
					</div>
				</div>
			</section>

			<section name="enrolledCourseSection">
				<div className="homePageCoursesTitle">
					Course Enrolled<div className="titleBorder"></div>
				</div>
				{enrolled_courses.map((item, index) => {
					return (
						<div className="courseBox" key={index}>
							<img
								className="courseImg"
								src={item?.thumbnail || photoNotAvailable}
								loading="lazy"
								alt=""
							/>
							<div className="courseDetails">
								<div className="courseTitle" onClick={() => handleCourseClick(item?.courseId)}>
									{item?.name}
								</div>
								<div className="instructorName">By {item?.instructor}</div>
								<div className="aboutCourse">{item?.description}</div>
								<LinearProgressWithLabel
									value={item?.enrollmentStatus === 'Open' ? Math.random() * 100 : 100}
								/>

								<Button
									variant="contained"
									color="primary"
									onClick={() => handleMarkAsCompletedBtn(item?.courseId)}
									sx={{ marginTop: '10px' }}
								>
									{item?.enrollmentStatus === 'Open' ? 'Mark as Completed' : 'Completed'}
								</Button>
							</div>
						</div>
					);
				})}
			</section>
		</div>
	);
}

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', mt: 10 }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and buffer variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired,
};

export default DashboardPage;
