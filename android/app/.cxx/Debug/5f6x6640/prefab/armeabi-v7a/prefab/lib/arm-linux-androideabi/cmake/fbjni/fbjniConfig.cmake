if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/zecki/.gradle/caches/9.3.1/transforms/6dc37c0f7c7af6db331e59dc9b484ea7/transformed/fbjni-0.7.0/prefab/modules/fbjni/libs/android.armeabi-v7a/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/zecki/.gradle/caches/9.3.1/transforms/6dc37c0f7c7af6db331e59dc9b484ea7/transformed/fbjni-0.7.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

