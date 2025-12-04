// exports.updatePersonalDetails = async (req, res) => {
//     try {
//         const id = req.user.id;

//         const {
//             course,
//             session,
//             college,
//             registrationNo,
//             ExamRollNo,
//             BoardName,
//             obtained,
//             year,
//             LinkedIn,
//             Github,
//             leetcode,
//             twitter
//         } = req.body;

//         const updated = await PersonalDetails.findOneAndUpdate(
//             { additionalDetails: id },
//             {
//                 $set: {
//                     course,
//                     session,
//                     college,
//                     registrationNo,
//                     ExamRollNo,
//                     BoardName,
//                     obtained,
//                     year,
//                     LinkedIn,
//                     Github,
//                     leetcode,
//                     twitter
//                 }
//             },
//             { new: true }
//         );

//         res.json({ success: true, updated });

//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };
