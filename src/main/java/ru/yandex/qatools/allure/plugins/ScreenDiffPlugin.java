package ru.yandex.qatools.allure.plugins;


import com.google.common.collect.Iterables;
import ru.yandex.qatools.allure.AllureTestCase;
import ru.yandex.qatools.allure.model.Status;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static ru.yandex.qatools.allure.model.Status.BROKEN;
import static ru.yandex.qatools.allure.model.Status.FAILED;

@Plugin.Name("screenDiff")
public class ScreenDiffPlugin extends DefaultTabPlugin implements WithWidget {

    private final static List<Status> FAILED_STATUSES = Arrays.asList(FAILED, BROKEN);

    List<DiffWidgetItem> testCases = new ArrayList<>();

    @Override
    public Object getWidgetData() {
        return newArrayList(Iterables.limit(testCases, 10));
    }

    @Override
    public void process(AllureTestCase testcase) {
        if (FAILED_STATUSES.contains(testcase.getStatus())) {
            testCases.add(new DiffWidgetItem(testcase.getUid())
                    .withTitle(testcase.getSuite().getTitle() + " " + testcase.getTitle())
                    .withStatus(testcase.getStatus()));
        }
    }
}
