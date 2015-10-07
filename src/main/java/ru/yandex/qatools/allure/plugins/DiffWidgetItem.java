package ru.yandex.qatools.allure.plugins;

import ru.yandex.qatools.allure.model.Status;

public class DiffWidgetItem {
    String uid;
    String title;
    Status status;

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
}
