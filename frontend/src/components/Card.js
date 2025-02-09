import React from "react";
import Graph from "./child/Graph";

const Card = ({ initialData, node_cont, date, title }) => {
    return (
        <div class="card" id="1">
            <div class="top">
                {/* <div class="userDetails">
                                    <div class="profilepic">
                                        <div class="profile_img">
                                            <div class="image">
                                                <img
                                                    src="https://media.geeksforgeeks.org/wp-content/uploads/20220609093229/g-200x200.png"
                                                    alt="img8"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h3>
                                        Ayush Agarwal
                                        <br />
                                        <span>Mumbai, India</span>
                                    </h3>
                                </div> */}
                <div class="userDetails">
                    <div class="profilepic">
                        <div class="profile_img">
                            <div class="image">
                                <img src="./Zorb.png" alt="img8" />
                            </div>
                        </div>
                    </div>
                    <h3>
                        {title}
                        <br />
                        <span>Base Blockchain</span>
                    </h3>
                </div>
                <div>
                    <span class="dot">
                        <i class="fas fa-ellipsis-h"></i>
                    </span>
                </div>
            </div>
            <div class="imgBx">
                <Graph __data={initialData}></Graph>
            </div>
            <div class="bottom">
                <div class="actionBtns">
                    <div class="left">
                        {/* <a href="#">
                                            <p class="message">
                                                <b>Base & Zora Collections</b>
                                            </p>
                                        </a> */}
                        <a href="#">
                            <h4 class="comments">View all {node_cont} projects</h4>
                        </a>
                        <a href="#">
                            <h5 class="postTime">{date}</h5>
                        </a>
                    </div>
                    <div class="right">
                        <svg
                            aria-label="Save"
                            class="_8-yf5"
                            color="#262626"
                            fill="#262626"
                            height="24"
                            role="img"
                            viewBox="0 0 48 48"
                            width="24"
                        >
                            <path
                                d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 
                                            47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 
                                            3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 
                                            1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 
                                            0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 
                                            1.4-.9 2.2-.9z"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
