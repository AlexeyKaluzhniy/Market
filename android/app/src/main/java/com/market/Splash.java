package com.market;

import android.app.Activity;
import android.database.sqlite.SQLiteDatabase;
import android.widget.TextView;

import com.facebook.common.logging.FLog;
import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;
import com.reactnativenavigation.NavigationActivity;
import com.zoontek.rnbootsplash.RNBootSplash;

import org.json.JSONObject;
import java.util.Locale;

public class Splash extends NavigationActivity {
    public static void showSplashWithGreetings(Activity context, int launchScreen, int userGreetingsId) {
        RNBootSplash.initLayout(
                launchScreen,
                context,
                (none) -> {
                    //uncomment next line and modify native screen if needed
                    // setGreetings(context, userGreetingsId);

                    return null;
                }
        );
    }

    public static void setGreetings(Activity context, int userGreetingsId) {
        try {
            String userName = getUserName(context);
            String language = getLanguage(context);
            String localLang = Locale.getDefault().getLanguage();
            TextView userNameView = context.findViewById(userGreetingsId);
            String hi = new String();
            if (language != null && !language.equals("null") && language.equals("ru") || language == null && localLang.equals("ru")) {
                hi = "Привет";
            } else {
                hi = "Hi";
            }
            StringBuilder greetings = new StringBuilder().append(hi);
            if (userName != null && !userName.equals("null")) {
                greetings
                        .append(", ")
                        .append(userName);
            }
            userNameView.setText(greetings.toString().toUpperCase());
        } catch (Exception e) {
            FLog.w("showUserGreetings", e.getMessage(), e);
        }
    }

    public static String getUserName(Activity context) {
        try {
            SQLiteDatabase dbSupplier = ReactDatabaseSupplier.getInstance(context.getApplicationContext()).get();
            String rootState = AsyncLocalStorageUtil.getItemImpl(dbSupplier, "persist:root");
            if (rootState != null) {
                JSONObject state = new JSONObject(rootState);
                String userName = new JSONObject(state.getString("profile")).getString("name");
                FLog.i("getUserName", "name", userName);

                return userName;
            }
//            Intent splashIntent = new Intent(getApplicationContext(), SplashScreen.class);
//            TextView userNameView = (TextView) mCurrentActivity.findViewById(R.id.splash_userGreetings);
//            userNameView.setText(userName);
        } catch (Exception e) {
            FLog.w("getUserName", e.getMessage(), e);
        }

        return null;
    }

    public static String getLanguage(Activity context) {
            try {
                SQLiteDatabase dbSupplier = ReactDatabaseSupplier.getInstance(context.getApplicationContext()).get();
                String rootState = AsyncLocalStorageUtil.getItemImpl(dbSupplier, "persist:root");
                if (rootState != null) {
                    JSONObject state = new JSONObject(rootState);
                    JSONObject language = new JSONObject(state.getString("system"));
                    String languageTag = language.getJSONObject("language").getString("languageTag");
                    FLog.i("getLanguage", "languageTag", languageTag);

                    return languageTag;
                }
            } catch (Exception e) {
                FLog.w("getLanguage", e.getMessage(), e);
            }

            return null;
        }
}
