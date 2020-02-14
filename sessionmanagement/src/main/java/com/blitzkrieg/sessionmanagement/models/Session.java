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
    private String token;
    private String city;

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Session(Date requestTime, String userName, String requestName, String requestStatus, String token) {
        this.requestTime = requestTime;
        this.userName = userName;
        this.requestName = requestName;
        this.requestStatus = requestStatus;
        this.token = token;
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
