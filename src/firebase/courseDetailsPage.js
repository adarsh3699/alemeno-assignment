import { database } from './initFirebase';
import { collection, onSnapshot, query, where, doc, updateDoc, increment } from 'firebase/firestore';

const colRef = collection(database, 'All_Courses');

function getCourseDetails(courseId, setCourseDetail, setIsGetCourseApiLoading, handleMsgShown) {
	if (!courseId) return setIsGetCourseApiLoading(false);
	const getDataQuery = query(colRef, where('__name__', '==', courseId)); // orderBy('name', 'desc || ase')  where('courseId', 'in', ['PvULuhJoNuCk7S8Ty1Oo', '9FhQjNp1LBrsw6ilGOuO'])

	setIsGetCourseApiLoading(true);
	onSnapshot(
		getDataQuery,
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
					likes: doc.data()?.likes,
					location: doc.data()?.location,
					prerequisites: doc.data()?.prerequisites,
					schedule: doc.data()?.schedule,
					syllabus: doc.data()?.syllabus,
				});
			});

			setIsGetCourseApiLoading(false);
			setCourseDetail(...(allCourses || {}));
		},
		(err) => {
			setIsGetCourseApiLoading(false);
			console.log(err);
			handleMsgShown(err.code, 'error');
		}
	);
}

async function incitementLike(courseId) {
	const docRef = doc(database, 'All_Courses', courseId);
	await updateDoc(docRef, {
		likes: increment(1),
	})
		.then(() => {
			console.log('Document successfully updated!');
		})
		.catch((error) => {
			console.error('Error updating document: ', error);
		});
}

export { getCourseDetails, incitementLike };
