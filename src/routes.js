import React, { Suspense, lazy } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CoursePage = lazy(() => import('./pages/AllCoursePage'));
const CourseDetailsPage = lazy(() => import('./pages/CourseDetailsPage'));

function Routes() {
	return (
		<Suspense
			fallback={
				<div className="background">
					<div id="loadingScreen">
						<div> Loading </div>
						<Loader />
					</div>
				</div>
			}
		>
			<Switch>
				<Route exact path="/" element={<DashboardPage />} />
				<Route
					exact
					path="/All_Courses"
					element={
						<>
							<CoursePage />
						</>
					}
				/>
				<Route exact path="/course/*" element={<CourseDetailsPage />} />
				<Route
					path="*"
					element={
						<center>
							<h1>Page not Found</h1>
						</center>
					}
				/>
			</Switch>
		</Suspense>
	);
}

export default Routes;
