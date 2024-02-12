import { database } from './initFirebase';
import { collection, onSnapshot } from 'firebase/firestore';

// collection ref
const colRef = collection(database, 'All_Courses');

function getAllcourses(setAllCourses, setIsGetCourseApiLoading, handleMsgShown) {
	setIsGetCourseApiLoading(true);
	onSnapshot(
		colRef,
		async (realSnapshot) => {
			let allCourses = [];
			realSnapshot.docs.forEach((doc) => {
				allCourses.push({
					courseId: doc.id,
					name: doc.data()?.name,
					thumbnail: doc.data()?.thumbnail,
					description: doc.data()?.description,
					duration: doc.data()?.duration,
					enrollmentStatus: doc.data()?.enrollmentStatus,
					instructor: doc.data()?.instructor,
					location: doc.data()?.location,
					likes: doc.data()?.likes,
					prerequisites: doc.data()?.prerequisites,
					schedule: doc.data()?.schedule,
					syllabus: doc.data()?.syllabus,
				});
			});
			setIsGetCourseApiLoading(false);
			setAllCourses(allCourses);
		},
		(err) => {
			setIsGetCourseApiLoading(false);
			console.log(err);
			handleMsgShown(err.code, 'error');
		}
	);
}

export { getAllcourses };
