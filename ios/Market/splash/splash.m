#import "splash.h"
#import <React/RCTBridge.h>
#import <UIKit/UIKit.h>
#import "RNCAsyncStorage.h"
#import "../TestConfiguration/TestConfigurationProvider.h"
#import "../TestConfiguration/SetIpView.h"

static UIViewController* bootSplashViewController = nil;
static bool isFlaggedAsHidden = false;

@implementation Splash

static UIWindow *_window = nil;

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (instancetype)init {
  if (self = [super init]) {
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleJavaScriptDidFailToLoad:)
                                                 name:RCTJavaScriptDidFailToLoadNotification
                                               object:nil];
  }

  return self;
}

+ (void)show: (RCTBridge*) bridge {
    UIViewController *rootViewController = [UIViewController new];

    _window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    _window.backgroundColor = [UIColor clearColor];
    _window.rootViewController = rootViewController;

  [Splash show:@"BootSplash" inView:rootViewController];
  //uncomment next line and modify native screen if needed
  //[Splash setUserGreetings: bridge];

    [_window makeKeyAndVisible];
}

+ (void)show:(NSString * _Nonnull)name inView:(UIViewController * _Nonnull)viewController {
  if (bootSplashViewController != nil) {
    return NSLog(@"🚨 [RNBootSplash] show method is called more than once");
  }

    CGRect screenBounds = [UIScreen mainScreen].bounds;
    NSString *launchStoryBoard =
        [[NSBundle mainBundle] objectForInfoDictionaryKey:@"UILaunchStoryboardName"];
    if (launchStoryBoard != nil) { // load the splash from the storyboard that's defined in the
                                   // info.plist as the LaunchScreen
        @try {
            UIStoryboard *storyboard = [UIStoryboard storyboardWithName:launchStoryBoard
                                                                 bundle:nil];
            UIViewController *launchVC = [storyboard instantiateInitialViewController];

            [viewController addChildViewController:launchVC];
            if ([TestConfigurationProvider isDebug]) {
              SetIpView *setIpView = [[SetIpView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
              [setIpView setBackground:launchVC.view];
              [viewController.view addSubview:setIpView];
              // rootView.loadingView = setIpView;
            } else {
              [viewController.view addSubview:launchVC.view];
            }
            // [viewController.view addSubview:launchVC.view];
            [launchVC didMoveToParentViewController:viewController];
        } @catch (NSException *e) {
            UIView *splashView = [[NSBundle mainBundle] loadNibNamed:launchStoryBoard
                                                               owner:self
                                                             options:nil][0];
            if (splashView != nil) {
                splashView.frame =
                    CGRectMake(0, 0, screenBounds.size.width, screenBounds.size.height);
                viewController.view = splashView;
            }
        }
    }

  if (launchStoryBoard != nil) {
    bootSplashViewController = viewController;
  } else {
    NSLog(@"🚨 [RNBootSplash] File \"%@.storyBoard\" does not exists or is not copied in app bundle resources", name);
  }
}

- (void)removeFromView {
  if (bootSplashViewController != nil) {
    [bootSplashViewController.view removeFromSuperview];
    bootSplashViewController = nil;
  }
    [[NSNotificationCenter defaultCenter] removeObserver:self
                                                    name:RCTJavaScriptDidFailToLoadNotification
                                                  object:nil];

    [Splash receiveBootSplashNotification];
}

- (void)handleJavaScriptDidFailToLoad:(NSNotification *)notification {
  [self removeFromView];
}

+ (void)setUserGreetings:(RCTBridge *)bridge
{
  // First, get the RNCAsyncStorage instance from the bridge
  RNCAsyncStorage *asyncStorage = [bridge moduleForClass:[RNCAsyncStorage class]];

  dispatch_queue_t queue = asyncStorage.methodQueue;
  if (queue != nil && queue != NULL && queue != (id)[NSNull null]) {
    dispatch_async(queue, ^{
      [asyncStorage multiGet:@[@"persist:root"] callback:^(NSArray *response) {
        @try {
          NSString *appStateString = response[1][0][1];
          NSData *appStateData = [appStateString dataUsingEncoding:NSUTF8StringEncoding];
          NSError *error;
          NSDictionary *jsonAppState = [NSJSONSerialization JSONObjectWithData:appStateData options:0 error:&error];
          NSString *profileStateString = [jsonAppState objectForKey:@"profile"];
          NSData *appProfileData = [profileStateString dataUsingEncoding:NSUTF8StringEncoding];
          NSDictionary *jsonProfileState = [NSJSONSerialization JSONObjectWithData:appProfileData options:0 error:&error];
          NSString *userName = [jsonProfileState objectForKey:@"name"];

          NSString *systemStateString = [jsonAppState objectForKey:@"system"];
          NSData *systemStateData = [systemStateString dataUsingEncoding:NSUTF8StringEncoding];
          NSDictionary *jsonSystemState = [NSJSONSerialization JSONObjectWithData:systemStateData options:0 error:&error];
          NSDictionary *languageString = [jsonSystemState objectForKey:@"language"];
          NSString *lang = [languageString objectForKey:@"languageTag"];

          [Splash displayUserGreetings:userName lang:lang];
        }
        @catch (NSException *exception) {
          NSLog(@"User name not found %@", exception.reason);
          [Splash displayUserGreetings:NULL lang:NULL];
        }
      }];
    });
  } else {
    NSLog(@"User name not found: Could not access to async storage");
    [Splash displayUserGreetings:NULL lang:NULL];
  }
}

+ (void)displayUserGreetings:(NSString *)userName lang:(NSString *)lang
{
  dispatch_async(dispatch_get_main_queue(), ^{
    @try {
      UIView *splashView = bootSplashViewController.view;
      for (id label in splashView.subviews[0].subviews) {
          if ([label isKindOfClass:[UILabel class]]) {
            UILabel *userGreetingsCandidate = label;
            if ([userGreetingsCandidate.accessibilityLabel isEqualToString:@"UserGreetings"]) {
              NSString *Greetings;
              NSString *hi;
              NSString *language = [[NSLocale preferredLanguages] objectAtIndex:0];
              NSArray* foo = [language componentsSeparatedByString: @"-"];
              NSString* firstBit = [foo objectAtIndex: 0];
              if ((lang != NULL && lang != (id)[NSNull null] && [lang isEqualToString:@"ru"]) || (lang == NULL && [firstBit isEqualToString:@"ru"])) {
                hi = @"Привет";
              } else {
                hi = @"Hi";
              }
              if (userName != NULL && userName != (id)[NSNull null]) {
                Greetings = [NSString stringWithFormat:@"%@, %@", hi, userName];
              } else {
                Greetings = hi;
              }
              userGreetingsCandidate.text = [[NSString stringWithFormat:@"%@", Greetings] uppercaseString];
            }
            NSLog(@"Label found");
          }
      }

    }
    @catch (NSException *exception) {
      NSLog(@"Something wrong during putting user name on label");
    }
  });
}

RCT_EXPORT_METHOD(hide:(BOOL)fade) {
  if (bootSplashViewController == nil || isFlaggedAsHidden) {
    return;
  }

  isFlaggedAsHidden = true;
  [self removeFromView];
}

+ (void) receiveBootSplashNotification
{
    _window = nil;
}

@end
