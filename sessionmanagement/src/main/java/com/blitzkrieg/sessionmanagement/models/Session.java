package com.blitzkrieg.sessionmanagement.models;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class Session {
    @Id
    private String Id;
    private Date requestTime;
    private String userName;
    private String requestName;
    private String requestStatus;

    public Session(Date requestTime, String userName, String requestName, String requestStatus) {
        this.requestTime = requestTime;
        this.userName = userName;
        this.requestName = requestName;
        this.requestStatus = requestStatus;
    }

    public Date getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(Date requestTime) {
        this.requestTime = requestTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRequestName() {
        return requestName;
    }

    public void setRequestName(String requestName) {
        this.requestName = requestName;
    }

    public String getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }

}
