import React from "react";
import "./Home.css";
import todolistvid from "./../../Assets/todolist.mp4";
import timervid from "./../../Assets/timerdemo.mp4";
import studylogvid from "./../../Assets/studylogdemo.mp4";
import newsvid from "./../../Assets/newsdemo.mp4";

const Home = () => {
    return (
        <div className="home">
            <section id="section01">
                <div className="title_text">
                    <p id="companyname" className="first_line">Flowmoro</p>
                    <p id="title" className="second_line">Enter your flow state</p>
                    <div class = "scrollButton">
                        <a href="#section02" class="scroll-down" address="true"></a>
                    </div>
                </div>
                
            </section>
            <section id="section02">
                <div class="home-container full magenta">
                    <div class="home-container">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="promo-text">
                                    <h3>Use our To-do List feature to track and manage your tasks</h3>
                                    <p>Stay organized effortlessly with the To-do List feature of our app. Add tasks with titles, descriptions, and due dates to keep track of your commitments. Edit, complete, or delete any task you would like.</p>
                                    <a href="../todolist" class="button">To-do List</a>
                                </div>
                            </div>
                            <div class="col-sm-6 align-right">
                                <video autoplay="" loop muted playsinline class = "demo_vid" preload="auto">
                                    <source src={todolistvid} type="video/mp4"/>
                                    Your browser does not support the video element. Kindly update it to latest version.
                                </video> 

                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home-container full purple">
                    <div class="home-container">
                        <div class="row">
                            <div class="col-sm-6">
                                <video autoplay="" loop muted playsinline class = "demo_vid" preload="auto">
                                    <source src={timervid} type="video/mp4"/>
                                    Your browser does not support the video element. Kindly update it to latest version.
                                </video> 
                            </div>
                            <div class="col-sm-6">
                                <div class="promo-text">
                                    <h3>Elevate your productivity with our integrated Pomodoro Timer</h3>
                                    <p>Unlock the potential of the Pomodoro time management technique for enhanced productivity with our integrated Pomodoro Timer. Customize work and break durations to suit your preferences. What sets this timer apart is its seamless connection to your To-Do List. On the left, easily select tasks for your current session by clicking their associated boxes. As you accomplish each task, a simple click on the small checkmark within the task box lets you stay on top of your progress. This feature ensures effective time management while maintaining a direct link between your tasks and your time, optimizing your work efficiency.</p>
                                    <a href="../timer" class="button">Timer</a>
                                </div>                     
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home-container full magenta">
                    <div class="home-container">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="promo-text">
                                    <h3>View your entire productivity journey with our Focus Log feature</h3>
                                    <p>Track your work sessions in chronological order, gaining insights into time allocation and task completion. A click on each log will show you detailed information about the duration dedicated to each task as well as your completed tasks for any session in a single, organized view. This comprehensive approach empowers you to assess your progress over time and draw motivation from your achievements. Take control of your focus journey and gain a clear understanding of your accomplishments with our Focus Log.</p>
                                    <a href="../focuslog" class="button">Focus Log</a>
                                </div>
                            </div>
                            <div class="col-sm-6 align-right">
                                <video autoplay="" loop muted playsinline class = "demo_vid" preload="auto">
                                    <source src={studylogvid} type="video/mp4"/>
                                    Your browser does not support the video element. Kindly update it to latest version.
                                </video> 

                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home-container full purple">
                    <div class="home-container">
                        <div class="row">
                            <div class="col-sm-6">
                                <video autoplay="" loop muted playsinline class = "demo_vid" preload="auto">
                                    <source src={newsvid} type="video/mp4"/>
                                    Your browser does not support the video element. Kindly update it to latest version.
                                </video> 
                            </div>
                            <div class="col-sm-6">
                                <div class="promo-text">
                                    <h3>Recharge with our News+ feature</h3>
                                    <p>Stay connected to the world's bright side by browsing up-to-date positive news across seven major categories. Each article card serves as a quick glimpse of the most uplifting stories available from reputable media networks. Whether it's a short pause or a more extended break, our News+ feature lets you infuse your downtime with optimism and stay informed about the positive developments around the globe.</p>
                                    <a href="../news" class="button">News+</a>
                                </div>                     
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section id="section02" className="home-container-full">
                <div className="home-container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1>
                                hellodfhdbgbkrjbgjkbjgjrg
                            </h1>
                        </div>

                        <div class="col-sm-6 align-right">
                            <h1>
                                helloermgbdmfgbdjkfgbsg sgv js gbrkg
                            </h1>
                        </div>
                    </div>
                </div>
                
            </section> */}
        </div>

        
    );
}

export default Home;