from lazy.lazy import lazy
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.select import Select
from group_project_v2.components.stage import StageState

__author__ = 'e.kolpakov'


class BaseElement(object):
    def __init__(self, browser, element):
        self._browser = browser
        self._element = element

    @property
    def browser(self):
        return self._browser

    @property
    def element(self):
        return self._element

    def __getattr__(self, item):
        if hasattr(self.__dict__, item):
            return getattr(self.__dict__, item)
        if hasattr(self.element, item):
            return getattr(self.element, item)
        return super(BaseElement, self).__getattr__(item)

    def make_element(self, dom_element, element_type):
        return element_type(self.browser, dom_element)


class GroupProjectElement(BaseElement):
    """ Wrapper around group project xblock element providing helpers common actions """
    ACTIVITY_CSS_SELECTOR = ".xblock-v1[data-block-type='group-project-v2-activity']"

    @property
    def activities(self):
        elements = self.element.find_elements_by_css_selector(self.ACTIVITY_CSS_SELECTOR)
        return [self.make_element(element, ActivityElement) for element in elements]

    @property
    def project_navigator(self):
        return self.make_element(
            self.element.find_element_by_css_selector("[data-block-type='group-project-v2-navigator']"),
            ProjectNavigatorElement
        )

    def get_activity_by_id(self, activity_id):
        activity_selector = self.ACTIVITY_CSS_SELECTOR+"[data-usage='{}']".format(activity_id)
        activity_element = self.element.find_element_by_css_selector(activity_selector)
        return self.make_element(activity_element, ActivityElement)

    def find_stage(self, activity_id, stage_id):
        activity_selector = self.ACTIVITY_CSS_SELECTOR+"[data-usage='{}']".format(activity_id)
        stage_selector = "#activity_"+stage_id
        activity_element = self.element.find_element_by_css_selector(activity_selector)
        return activity_element.find_element_by_css_selector(stage_selector)


class ActivityElement(BaseElement):
    STAGE_CSS_SELECTOR = "div.activity_section"

    @property
    def id(self):
        return self.element.get_attribute('data-usage')

    @property
    def stages(self):
        elements = self.element.find_elements_by_css_selector(self.STAGE_CSS_SELECTOR)
        return [self.make_element(element, StageElement) for element in elements]

    def get_stage_by_id(self, stage_id):
        stage_selector = self.STAGE_CSS_SELECTOR + "#activity_"+stage_id
        stage_element = self.element.find_element_by_css_selector(stage_selector)
        return self.make_element(stage_element, StageElement)


class StageElement(BaseElement):
    @property
    def id(self):
        return self.element.get_attribute('id').replace('activity_', '')

    @property
    def title(self):
        return self.element.find_element_by_css_selector('h1 .stage_title').text

    @property
    def open_close_label(self):
        try:
            element = self.element.find_element_by_css_selector('h1 .highlight')
            return element.text
        except NoSuchElementException:
            return None

    @property
    def content(self):
        return self.element.find_element_by_css_selector('.stage_content')


class ReviewStageElement(StageElement):
    @property
    def form(self):
        return self.make_element(self.find_element_by_tag_name('form'), ReviewFormElement)
    
    @property
    def peers(self):
        peers = self.element.find_elements_by_css_selector(".peers .select_peer")
        return [self.make_element(element, ReviewObjectSelectorElement) for element in peers]

    @property
    def groups(self):
        peers = self.element.find_elements_by_css_selector(".other_groups .select_group")
        return [self.make_element(element, ReviewObjectSelectorElement) for element in peers]

class ReviewObjectSelectorElement(BaseElement):
    @property
    def name(self):
        return self.get_attribute('title')


class ReviewFormElement(BaseElement):
    def _get_hidden_input_value(self, input_name):
        return self.element.find_element_by_css_selector("input[name='{}']".format(input_name)).get_attribute('value')

    @property
    def peer_id(self):
        return self._get_hidden_input_value('peer_id')

    @property
    def stage_id(self):
        return self._get_hidden_input_value('stage_id')

    @property
    def group_id(self):
        return self._get_hidden_input_value('group_id')

    @property
    def questions(self):
        return [
            self.make_element(element, ReviewQuestionElement)
            for element in self.element.find_elements_by_css_selector(".question")
        ]

    @property
    def submit(self):
        return self.element.find_element_by_css_selector("button.submit")


class ReviewQuestionElement(BaseElement):
    @property
    def label(self):
        return self.element.find_element_by_tag_name("label").text

    @property
    def control(self):
        return self.make_element(self.element.find_element_by_css_selector("input,textarea,select"), InputControl)


class InputControl(BaseElement):
    def __getattr__(self, item):
        if hasattr(self.element, item):
            return getattr(self.element, item)
        else:
            return self.element.get_attribute(item)

    def fill_text(self, text):
        self.element.clear()
        self.element.send_keys(text)

    def select_option(self, option_value):
        select = Select(self.element)
        select.select_by_value(option_value)

    @property
    def options(self):
        options = self.element.find_elements_by_tag_name("option")
        if options:
            return {option.get_attribute('value'): option.text for option in options}
        else:
            return None


class ProjectNavigatorElement(BaseElement):
    @lazy
    def views(self):
        elements = self.find_elements_by_css_selector(".group-project-navigator-view")
        return [self.make_element(element, ProjectNavigatorViewElement) for element in elements]

    @lazy
    def view_selectors(self):
        elements = self.element.find_elements_by_css_selector(".view-selector-item")
        return [self.make_element(element, ProjectNavigatorViewSelectorElement) for element in elements]

    def get_view_by_type(self, target_type, view_element_class=None):
        view_element_class = view_element_class if view_element_class else ProjectNavigatorViewElement
        css_selector = ".group-project-navigator-view[data-view-type='{}']".format(target_type)
        element = self.find_element_by_css_selector(css_selector)
        return self.make_element(element, view_element_class)

    def get_view_selector_by_type(self, target_type):
        return [view_selector for view_selector in self.view_selectors if view_selector.type == target_type][0]


class ProjectNavigatorViewElement(BaseElement):
    @property
    def type(self):
        return self.get_attribute("data-view-type")

    def close_view(self):
        try:
            close_button = self.element.find_element_by_css_selector(".group-project-navigator-view-close")
            close_button.click()
        except NoSuchElementException:
            raise AssertionError("View cannot be closed")


class ProjectNavigatorViewSelectorElement(BaseElement):
    @property
    def type(self):
        return self.get_attribute("data-view-type")


class NavigationViewElement(ProjectNavigatorViewElement):
    @property
    def stages(self):
        stage_elements = self.element.find_elements_by_css_selector(".group-project-stage")
        return [self.make_element(elem, StageItemElement) for elem in stage_elements]


class StageItemElement(BaseElement):
    def __init__(self, browser, element):
        super(StageItemElement, self).__init__(browser, element)
        self.stage_link = element.find_element_by_css_selector(".group-project-stage-type a")

    @property
    def stage_id(self):
        return self.get_attribute("data-stage-id")

    @property
    def activity_id(self):
        return self.stage_link.get_attribute("data-activity-id")

    @property
    def title(self):
        return self.find_element_by_css_selector(".group-project-stage-title").text.strip()

    @property
    def state(self):
        classes = set(self.find_element_by_css_selector(".group-project-stage-state").get_attribute("class").split())
        state_classes = {StageState.COMPLETED, StageState.INCOMPLETE, StageState.NOT_STARTED}
        intersection = (classes & state_classes)
        assert(len(intersection)) == 1
        return intersection.pop()


    def navigate_to(self):
        self.stage_link.click()
