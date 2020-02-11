package com.blitzkrieg.sessionmanagement.models;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class BlackToken {
    @Id
    private String Id;

    private String token;
    private Date blacklistedOn;
    public BlackToken(){}
    public BlackToken(String token, Date blacklistedOn) {
        this.token = token;
        this.blacklistedOn = blacklistedOn;
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getBlacklistedOn() {
        return blacklistedOn;
    }

    public void setBlacklistedOn(Date blacklistedOn) {
        this.blacklistedOn = blacklistedOn;
    }


}
