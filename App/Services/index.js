import { gql, request } from 'graphql-request'

const MASTER_URL = 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clyyep4m300kb08v29vb5we9v/master';

export const getCourseList = async (level) => {

  const query = gql`
    query CourseList {
      courses(where: {level:${level}}) {
        id
        name
        level
        price
        description {
          markdown
        }
        tags
        time
        author
        banner {
          url
        }
        chapters {
          title
          id
          chapterContent {
            heading
            description {
              markdown
              html
            }
            output {
              markdown
              html
            }
          }
        }
      }
    }`


  const result = await request(MASTER_URL, query);
  return result;
}



export const enrollCourse = async (courseID, userEmail) => {
  const mutationQuery = gql`
    mutation MyMutation {
      createUserEnrolledCourse(
        data: {
          courseId: "${courseID}",
          userEmail: "${userEmail}",
          course: { connect: { id: "${courseID}" } }
        }
      ) {
        id
      }
      publishManyUserEnrolledCoursesConnection {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error("Error enrolling course:", error);
    throw error;
  }
};




export const getUserEnrolledCourse = async (courseID, userEmail) => {
  const query = gql`
    query GetUserEnrolledCourse {
      userEnrolledCourses(
        where: {courseId: "${courseID}", userEmail: "${userEmail}"}
      ) {
        id
        courseId
        completedChapter {
          chapterId
        }
      }
    }`;

  try {
    const result = await request(MASTER_URL, query);

    return result;
  } catch (error) {
    console.error("Error fetching user enrolled courses:", error);
    throw error;
  }
};

export const markChapterCompleted = async (chapterId, recordId, userEmail, points) => {

  console.log("kaydedilecek puan--", points)
  const mutationQuery = gql`
    mutation markChapterCompleted {
      updateUserEnrolledCourse(
        data: { completedChapter: { create: { data: { chapterId: "${chapterId}" } } } }
        where: { id: "${recordId}" }
      ) {
        id
      }
      publishManyUserEnrolledCoursesConnection {
        edges {
          node {
            id
          }
        }
      }
      updateUserDetail(
        where: { email: "${userEmail}" },
        data: { point: ${points} }
      ) {
        point
      }
      publishUserDetail(where: { email: "${userEmail}" }) {
        id
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error('Error in markChapterCompleted:', error);
    throw error;
  }
};

export const createNewUser = async (userName, email, profileImageUrl) => {
  const query = gql`
    mutation CreateNewUser {
      upsertUserDetail(
        upsert: {
          create: {
            email: "${email}",
            point: 10,
            profileImage: "${profileImageUrl}",
            userName: "${userName}"
          },
          update: {
            email: "${email}",
            profileImage: "${profileImageUrl}",
            userName: "${userName}"
          }
        },
        where: {
          email: "${email}"
        }
      ) {
        id
      }
      publishUserDetail(where: { email: "${email}" }) {
        id
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error('Error creating new user:', error);
  }
};


export const getUserDetail = async (email) => {
  const query = gql`
  query getUserDetails {
    userDetail(where:
    {email: "${email}"}) {
      point
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

export const GetAllUser = async () => {
  const query = gql`
  query GetAllUsers {
  userDetails(orderBy: point_DESC) {
    id
    userName
    profileImage
    point
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}



export const GetAllUserEnrolledProgressCourse = async (userEmail) => {
  const query = gql`
  query GetAllUserEnrolledProgressCourse {
  userEnrolledCourses(where: {userEmail: "${userEmail}"}) {
    completedChapter {
      chapterId
    }
    course {
      banner {
        url
      }
      chapters {
        id
        title
        chapterContent{
          heading
          description {
            markdown
            html
          }
            output{
              markdown
              html
            }
        }
      }
      description {
        markdown
      }
      id
      level
      name
      price
      time
    }
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}