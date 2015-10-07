package ru.yandex.qatools.allure.plugins;

import ru.yandex.qatools.allure.model.Status;

public class DiffWidgetItem {
    private String uid;
    private String title;
    private Status status;

    DiffWidgetItem(String uid) {
        this.uid = uid;
    }

    public DiffWidgetItem withTitle(String title) {
        this.title = title;
        return this;
    }

    public DiffWidgetItem withStatus(Status status) {
        this.status = status;
        return this;
    }

    public String getUid() {
        return uid;
    }

    public String getTitle() {
        return title;
    }

    public Status getStatus() {
        return status;
    }
}
