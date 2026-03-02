# Learning Playwright

This is the repository for the LinkedIn Learning course `learning-playwright`. The full course is available from [LinkedIn Learning][lil-course-url].

![learning-playwright][lil-thumbnail-url]

## Course Description

It’s no surprise that Playwright has joined the ranks of other top-rated open-source automation tools. Playwright’s comprehensive feature set allows testers and developers to quickly create new test automation projects without having to combine multiple libraries and other tools. Whether you’re a manual tester, a quality assurance specialist, a software developer, or a seasoned automation engineer, this course offers hands-on, practical experience with using some of the most important features of Playwright. Join instructor Butch Mayhew as he takes you through the essentials and prepares you to start writing, running, analyzing, and debugging your first test.

_See the readme file in the main branch for updated instructions and information._

## Instructions

This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches

The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter.
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
Add changes to git using this command: git add .
Commit changes using this command: git commit -m "some message"

## Using the Course Repository

1. To use these exercise files, you must have the following installed:
   - Current, Active, or Maintenance version of [node](https://nodejs.org/en/about/previous-releases) | [node installer](https://nodejs.org/en/download/prebuilt-installer)
   - [GIT](https://github.com/git-guides/install-git) for command line only or [GitHub Desktop](https://github.com/apps/desktop) for a GUI experience.
   - [VS Code](https://code.visualstudio.com/) Code Editor
   - [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
   - The rest of the steps are covered in the course
2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.
3. Utilize the [RESOURCES.md](./RESOURCES.md) file to follow along with all the links to the course.

## Instructor

Butch Mayhew

Playwright Ambassador

                        
Check out my other courses on [LinkedIn Learning](https://www.linkedin.com/learning/instructors/butch-mayhew?u=104).

[0]: # "Replace these placeholder URLs with actual course URLs"
[lil-course-url]: https://www.linkedin.com/learning/learning-playwright/
[lil-thumbnail-url]: https://media.licdn.com/dms/image/v2/D4D0DAQH9KXFauT3_nw/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1730827611420?e=2147483647&v=beta&t=Hgonc3KqLVcsREG50BjKBFZ07NP2DY-pksa9-Oweu7Q
